export function buidForm(data: object):FormData {
  const formData = new FormData();
    Object.entries(data).forEach(
      ([key, value]:any) => {
        if (value) {
          formData.append(key, value)
        }
      }
    );
  return formData
}
