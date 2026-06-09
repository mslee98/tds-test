export function navigateToPage(page?: string) {
  const url = new URL(window.location.href);

  if (page) {
    url.searchParams.set('page', page);
  } else {
    url.searchParams.delete('page');
  }

  window.location.href = url.toString();
}
