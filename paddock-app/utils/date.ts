export function formatUTCDateToLocal(utcString: string | undefined): string {
    if (utcString === undefined) {
        return 'N/A';
    }
    const date = new Date(utcString);
    return date.toLocaleString('de-DE');
}