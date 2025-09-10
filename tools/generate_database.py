import gzip
import json
import logging
import shutil
from pathlib import Path

import pandas as pd

# Setup basic logging configuration
logging.basicConfig(
    format="%(asctime)s - %(levelname)s: %(message)s", level=logging.INFO
)
logger = logging.getLogger()


class TimezoneETL:
    """
    ETL process to build a city-wise timezone and UTC offset mapping.
    Outputs:
    - A compressed JSON file with city names, coordinates, and UTC offsets.
    - A timezone offset cache (JSON) for reuse.
    """

    def __init__(self) -> None:
        """Initialize paths and load timezone offset cache if available."""
        self.root = Path(__file__).resolve().parent.parent

        self.source_dir = self.root / "tools/geonames"
        self.database_dir = self.root / "public/assets/database"
        shutil.rmtree(self.database_dir, True)
        self.database_dir.mkdir(parents=True, exist_ok=True)

        self.TZ_DATA = self.database_dir / "tz_offset.json"
        self.CITY_DATA = self.database_dir / "city_database.cjson"

    def run(self) -> None:
        """
        Main ETL execution:
        - Load and normalize city and timezones data
        - Compute timezone and offsets for each city
        - Save output JSON (city database and timezone offsets)
        """
        logger.info("Starting Timezone ETL process")

        # Load world cities CSV
        df_cities = pd.read_csv(
            self.source_dir / "cities5000.txt",
            encoding="utf-8",
            sep="\t",
            header=None,
            names=[
                "geonameid",
                "city_name_local",
                "city_name",
                "alternatenames",
                "latitude",
                "longitude",
                "feature_class",
                "feature_code",
                "country_code",
                "cc2",
                "admin1_code",
                "admin2_code",
                "admin3_code",
                "admin4_code",
                "population",
                "elevation",
                "dem",
                "timezone",
                "modification_date",
            ],
        )

        # Load timeZones.txt
        df_tz = pd.read_csv(
            self.source_dir / "timeZones.txt",
            encoding="utf-8",
            sep="\t",
            header=0,
            names=[
                "country_code",
                "timezone",
                "gmt_offset",
                "dst_offset",
                "raw_offset",
            ],
        )

        # Load admin1CodesASCII.txt (tab-separated)
        df_admin = pd.read_csv(
            self.source_dir / "admin1CodesASCII.txt",
            encoding="utf-8",
            sep="\t",
            header=None,
            names=["admin_id", "state_name_local", "state_name", "geonameid"],
        )

        # Load countryInfo.txt (tab-separated)
        df_country = pd.read_csv(
            self.source_dir / "countryInfo.txt",
            sep="\t",
            comment="#",
            header=None,
            names=[
                "country_code",
                "iso3",
                "iso_numeric",
                "fips",
                "country_name",
                "capital",
                "area",
                "population",
                "continent",
                "tld",
                "currencycode",
                "currencyname",
                "phone",
                "postal_code_format",
                "postal_code_regex",
                "languages",
                "geonameid",
                "neighbours",
                "equivalentfipscode",
            ],
        )

        # Create admin_id in df_cities for join
        df_cities["admin_id"] = (
            df_cities["country_code"] + "." + df_cities["admin1_code"].astype(str)
        )

        # Join country_code with df_country to get country_name
        df_cities = df_cities.merge(
            df_country[["country_code", "country_name"]], on="country_code", how="left"
        )

        # Join admin1 with df_admin to get state_name
        df_cities = df_cities.merge(
            df_admin[["admin_id", "state_name"]],
            on="admin_id",
            how="left",
        )

        # concat city, state, country names
        df_cities["city_name"] = df_cities.apply(
            lambda row: (
                f"{row['city_name']}, {row['country_name']}"
                if str(row["city_name"]).lower().replace(" ", "")
                == str(row["state_name"]).lower().replace(" ", "")
                else f"{row['city_name']}, {row['state_name']}, {row['country_name']}"
            ),
            axis=1,
        )

        # Parse numeric Lat Lon
        df_cities["latitude"] = pd.to_numeric(df_cities["latitude"], errors="coerce")
        df_cities["longitude"] = pd.to_numeric(df_cities["longitude"], errors="coerce")

        # Compress with deterministic gzip (mtime=0)
        with gzip.GzipFile(
            mode="wb",
            fileobj=self.CITY_DATA.open("wb"),
            mtime=0,
        ) as f:
            f.write(
                json.dumps(
                    df_cities.sort_values(
                        by=["country_name", "state_name", "city_name"]
                    )[["city_name", "latitude", "longitude", "timezone"]]
                    .drop_duplicates()
                    .values.tolist(),
                    ensure_ascii=False,
                ).encode("utf-8")
            )
            logger.info(f"Saved compressed city data to: {self.CITY_DATA}")

        # Save timezone offset database
        with self.TZ_DATA.open("w", encoding="utf-8") as f:
            json.dump(
                dict(
                    df_tz[["timezone", "gmt_offset"]]
                    .drop_duplicates()
                    .sort_values(by=["timezone"])
                    .values
                ),
                f,
                ensure_ascii=False,
                indent=4,
            )
            logger.info(f"Saved timezone offsets data to: {self.TZ_DATA}")
        logger.info("ETL process completed successfully")


if __name__ == "__main__":
    etl = TimezoneETL()
    etl.run()
