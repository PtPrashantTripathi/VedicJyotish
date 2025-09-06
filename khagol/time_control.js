class TimeControl {
    constructor(initialDate, onDateChange) {
        this.dt = initialDate || new Date();
        this.onDateChange = onDateChange;

        // DOM Elements
        this.currentDateDisplay = document.getElementById(
            "current-date-display"
        );
        this.dayInput = document.getElementById("day-input");
        this.monthInput = document.getElementById("month-input");
        this.yearInput = document.getElementById("year-input");
        this.hourInput = document.getElementById("hour-input");
        this.minuteInput = document.getElementById("minute-input");
        this.btnGotoNow = document.getElementById("goto-now");
        this.btnGotoKaliyugStart =
            document.getElementById("goto-kaliyug-start");
        this.scrubber = document.getElementById("time-scrubber");
        this.indicator = document.getElementById("scrubber-indicator");

        // Scrubber state
        this.isScrubbing = false;
        this.scrubIntervalId = null;
        this.scrubberCenterX = 0;
        this.currentDeltaX = 0;
        this.scrubIntervalDuration = 10; // ms
        this.timeScaleFactor = 10; // hours per pixel offset per second

        this.hindiMonthNames = [
            "जनवरी",
            "फ़रवरी",
            "मार्च",
            "अप्रैल",
            "मई",
            "जून",
            "जुलाई",
            "अगस्त",
            "सितम्बर",
            "अक्टूबर",
            "नवम्बर",
            "दिसम्बर",
        ];

        this.init();
    }

    init() {
        if (!this.currentDateDisplay) {
            console.error("Time control UI elements not found in the DOM.");
            return;
        }
        this.attachEventListeners();
        this.updateControlsUI();
        if (this.onDateChange) {
            this.onDateChange(this.dt);
        }
    }

    attachEventListeners() {
        // Input fields
        this.yearInput.addEventListener("change", () =>
            this.navigateDate("year", this.yearInput.value)
        );
        this.monthInput.addEventListener("change", () =>
            this.navigateDate("month", this.monthInput.value)
        );
        this.dayInput.addEventListener("change", () =>
            this.navigateDate("day", this.dayInput.value)
        );
        this.hourInput.addEventListener("change", () =>
            this.navigateDate("hour", this.hourInput.value)
        );
        this.minuteInput.addEventListener("change", () =>
            this.navigateDate("minute", this.minuteInput.value)
        );

        // Buttons
        this.btnGotoNow.addEventListener("click", () =>
            this.navigateDate("now")
        );
        this.btnGotoKaliyugStart.addEventListener("click", () =>
            this.navigateDate("kaliyugStart")
        );

        // Scrubber
        this.scrubber.addEventListener("mousedown", this.startScrub.bind(this));
        this.scrubber.addEventListener(
            "touchstart",
            this.startScrub.bind(this),
            { passive: false }
        );

        // Window resize for scrubber center calculation
        window.addEventListener("resize", () => {
            if (this.isScrubbing) {
                this.scrubberCenterX = this.getScrubberCenter();
            }
        });
    }

    updateControlsUI() {
        if (!this.dt) return;

        const year = this.dt.getFullYear();
        const era = year <= 0 ? " BCE" : " CE";
        const displayYear = year <= 0 ? Math.abs(year) + 1 : year;

        this.currentDateDisplay.innerHTML = `${this.dt.getDate().toString().padStart(2, "0")} ${this.hindiMonthNames[this.dt.getMonth()]} ${displayYear} ${era} ${this.dt.getHours().toString().padStart(2, "0")}:${this.dt.getMinutes().toString().padStart(2, "0")}`;

        this.dayInput.value = this.dt.getDate();
        this.monthInput.value = this.dt.getMonth() + 1;
        this.yearInput.value = this.dt.getFullYear();
        this.hourInput.value = this.dt.getHours();
        this.minuteInput.value = this.dt.getMinutes();
    }

    navigateDate(unit, value) {
        let currentDate = new Date(this.dt.getTime());
        switch (unit) {
            case "day":
                currentDate.setDate(parseInt(value, 10));
                break;
            case "month":
                currentDate.setMonth(parseInt(value, 10) - 1);
                break;
            case "year":
                const yearValue = parseInt(value, 10);
                if (!isNaN(yearValue)) {
                    currentDate.setFullYear(yearValue);
                } else {
                    console.error("Invalid year entered:", value);
                    alert(
                        "Invalid year entered. Please use numbers (e.g., 2023, -3101 for 3102 BCE)."
                    );
                    return;
                }
                break;
            case "hour":
                const hourValue = parseInt(value, 10);
                if (hourValue >= 0 && hourValue <= 23) {
                    currentDate.setHours(hourValue);
                } else {
                    console.warn(`Invalid hour: ${value}`);
                    return;
                }
                break;
            case "minute":
                const minuteValue = parseInt(value, 10);
                if (minuteValue >= 0 && minuteValue <= 59) {
                    currentDate.setMinutes(minuteValue);
                } else {
                    console.warn(`Invalid minute: ${value}`);
                    return;
                }
                break;
            case "now":
                currentDate = new Date();
                break;
            case "kaliyugStart":
                currentDate.setFullYear(-3101, 1, 18);
                currentDate.setHours(0, 0, 0, 0);
                break;
            default:
                console.warn("Unknown navigation unit:", unit);
                return;
        }
        this.dt = currentDate;
        this.updateControlsUI();
        if (this.onDateChange) {
            this.onDateChange(this.dt);
        }
    }

    // --- Time Scrubber Logic ---
    getScrubberCenter() {
        const rect = this.scrubber.getBoundingClientRect();
        return rect.left + rect.width / 2;
    }

    updateIndicatorPosition() {
        if (!this.indicator) return;
        const rect = this.scrubber.getBoundingClientRect();
        const maxDelta = rect.width / 2;
        const clampedDeltaX = Math.max(
            -maxDelta,
            Math.min(maxDelta, this.currentDeltaX)
        );
        const indicatorPosPercent = 50 + (clampedDeltaX / maxDelta) * 50;
        this.indicator.style.left = `${indicatorPosPercent}%`;
    }

    startScrub(event) {
        event.preventDefault();
        this.isScrubbing = true;
        this.scrubberCenterX = this.getScrubberCenter();
        this.scrubber.classList.add("active");

        const currentX = event.touches
            ? event.touches[0].clientX
            : event.clientX;
        this.currentDeltaX = currentX - this.scrubberCenterX;
        this.updateIndicatorPosition();

        if (this.scrubIntervalId) {
            clearInterval(this.scrubIntervalId);
        }

        this.scrubIntervalId = setInterval(
            this.applyTimeScrub.bind(this),
            this.scrubIntervalDuration
        );

        this.boundHandleScrubMove = this.handleScrubMove.bind(this);
        this.boundStopScrub = this.stopScrub.bind(this);

        window.addEventListener("mousemove", this.boundHandleScrubMove);
        window.addEventListener("touchmove", this.boundHandleScrubMove, {
            passive: false,
        });
        window.addEventListener("mouseup", this.boundStopScrub);
        window.addEventListener("touchend", this.boundStopScrub);
        window.addEventListener("mouseleave", this.boundStopScrub);
        window.addEventListener("touchcancel", this.boundStopScrub);
    }

    handleScrubMove(event) {
        if (!this.isScrubbing) return;
        event.preventDefault();

        const currentX = event.touches
            ? event.touches[0].clientX
            : event.clientX;
        this.currentDeltaX = currentX - this.scrubberCenterX;
        this.updateIndicatorPosition();
    }

    applyTimeScrub() {
        if (!this.isScrubbing || Math.abs(this.currentDeltaX) < 2) {
            return;
        }

        const hoursPerSecond = this.currentDeltaX * this.timeScaleFactor;
        const msIncrement =
            hoursPerSecond * 3600 * 1000 * (this.scrubIntervalDuration / 1000);

        this.dt.setTime(this.dt.getTime() + msIncrement);

        this.updateControlsUI();
        if (this.onDateChange) {
            this.onDateChange(this.dt);
        }
    }

    stopScrub() {
        if (!this.isScrubbing) return;

        this.isScrubbing = false;
        this.scrubber.classList.remove("active");
        this.currentDeltaX = 0;
        this.updateIndicatorPosition();

        if (this.scrubIntervalId) {
            clearInterval(this.scrubIntervalId);
            this.scrubIntervalId = null;
        }

        window.removeEventListener("mousemove", this.boundHandleScrubMove);
        window.removeEventListener("touchmove", this.boundHandleScrubMove);
        window.removeEventListener("mouseup", this.boundStopScrub);
        window.removeEventListener("touchend", this.boundStopScrub);
        window.removeEventListener("mouseleave", this.boundStopScrub);
        window.removeEventListener("touchcancel", this.boundStopScrub);
    }
}
