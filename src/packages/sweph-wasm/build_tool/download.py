import os
from pathlib import Path

import requests

from . import config

BASE_URL = "https://raw.githubusercontent.com/aloistr/swisseph/refs/heads/master"
DEST_DIR = Path(__file__).parent.parent / "swisseph"


def download_files():
    os.makedirs(DEST_DIR, exist_ok=True)
    for file_name in config.SOURCE_FILES:
        url = f"{BASE_URL}/{file_name}"
        dest_path = os.path.join(DEST_DIR, file_name)

        try:
            print(f"Downloading {file_name}...")
            resp = requests.get(url, timeout=30)
            resp.raise_for_status()

            with open(dest_path, "wb") as f:
                f.write(resp.content)
            print(f"✅ Saved {file_name} to {dest_path}")
        except requests.RequestException as e:
            print(f"❌ Failed to download {file_name}: {e}")


if __name__ == "__main__":
    download_files()
    DEST_DIR.joinpath(".gitignore").write_text("*")
