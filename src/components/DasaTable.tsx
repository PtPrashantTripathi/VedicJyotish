import type { Dasha } from "src/services/calcVimsottariDasa";

interface Props {
    dasa: Dasha;
}

export function DasaTable({ dasa }: Props) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Dasa Lord</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                </tr>
            </thead>
            <tbody>
                <tr key={dasa.Name}>
                    <td>{dasa.Lord}</td>
                    <td>{dasa.StartDate.toString()}</td>
                    <td>{dasa.EndDate.toString()}</td>
                </tr>

                {dasa.Phal
                    ? Object.entries(dasa.Phal).map(([book, result]) => (
                          <tr key={book}>
                              <td>{book}</td>
                              <td colSpan={2}>{result?.hindi || "-"}</td>
                          </tr>
                      ))
                    : null}
            </tbody>
        </table>
    );
}
