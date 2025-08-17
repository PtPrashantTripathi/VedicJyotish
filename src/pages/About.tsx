export default function About() {
    return (
        <section>
            <h1>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                Contribute
            </h1>
            <h3>Purpose of Astrology</h3>
            <p>
                <strong>
                    यथा शिखा मयूराणां नागानां मणयो यथा ।<br />
                    तद्वद्वेदांगशास्त्राणां ज्यौतिषं मूर्धानि स्थितम् ॥ ४॥
                </strong>
                <br />
                "Like the regal crest of a peacock or the precious gem on a
                cobra's hood, Jyotish, or Astrology, holds the highest place
                among the Vedanga Sastras." It guides us towards an improved
                future and a fulfilling life.
            </p>
            <p>
                Found a bug or have suggestions? Feel free to open a pull
                request or issue.
            </p>
            <a
                href="https://github.com/nielsVoogt/nice-forms.css"
                className="to-repo"
                target="_blank">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-external-link">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Check out the repo
            </a>
        </section>
    );
}
