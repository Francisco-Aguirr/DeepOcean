export function showCurrentYear() {
  const yearSpan = document.getElementById('year');
  yearSpan.textContent = new Date().getFullYear();
}
