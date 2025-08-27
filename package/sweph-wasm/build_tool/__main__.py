# build_tool/__main__.py
import argparse
import subprocess
from pathlib import Path

from .builder import Builder


def main():
    """Main entry point for the build script."""
    parser = argparse.ArgumentParser(
        description="Build tool for the Swisseph WebAssembly module."
    )

    parser.add_argument(
        "-e",
        "--env",
        default="dev",
        choices=["dev", "prod"],
        help="Build environment: 'dev' for development (with debug info) or 'prod' for production (optimized).",
    )
    parser.add_argument(
        "-v",
        "--verbose",
        action="store_true",
        help="Enable verbose output for debugging.",
    )
    parser.add_argument(
        "-t",
        "--targets",
        nargs="+",
        default=["node", "web", "worker"],
        help="A list of Emscripten environments to build for (e.g., node web worker).",
    )

    args = parser.parse_args()

    # The base directory is the parent of the 'build_tool' directory
    base_dir = Path(__file__).parent.parent

    try:
        builder = Builder(base_dir=base_dir, env=args.env, verbose=args.verbose)
        builder.run(targets=args.targets)
    except (EnvironmentError, FileNotFoundError, subprocess.CalledProcessError) as e:
        print(f"\nA critical error occurred: {e}")
        exit(1)


if __name__ == "__main__":
    main()
