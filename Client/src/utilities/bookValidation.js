export default function bookValidation(formData) {
  const checkValue = (value) => value == null || value == "";

  if (checkValue(formData.name)) {
    alert("Please enter book name");
    return false;
  }

  if (checkValue(formData.year)) {
    alert("Please enter book year");
    return false;
  }

  if (checkValue(formData.author)) {
    alert("Please enter book author");
    return false;
  }

  if (checkValue(formData.genre)) {
    alert("Please enter book genre");
    return false;
  }

  return true;
}
