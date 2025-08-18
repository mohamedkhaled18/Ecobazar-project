function toggleSection(header) {
  // header.classList.toggle("open");
  const text = header.nextElementSibling;
  if (text.classList.contains("show")) {
    text.classList.remove("show");
  } else {
    text.classList.add("show");
  }
}