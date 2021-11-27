export const splitting = (x) => {
    const filteredString = x.split(/[<div>,</div>]+/)
    return filteredString
}