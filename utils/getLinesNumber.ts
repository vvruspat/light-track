export default function calculateNumberOfLines(element: HTMLElement): number {
  const styles = window.getComputedStyle(element);
  const lineHeight = Number.parseFloat(styles.lineHeight);
  const height = element.clientHeight; // visible content height
  const paddingTop = Number.parseFloat(styles.paddingTop);
  const paddingBottom = Number.parseFloat(styles.paddingBottom);

  // Total visible height minus padding divided by line height
  const lines = Math.floor((height - paddingTop - paddingBottom) / lineHeight);
  return lines;
}
