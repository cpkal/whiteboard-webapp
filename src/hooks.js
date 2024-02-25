export default function useCanvas(ref) {
  const canvas = ref.current;
  const c = canvas.getContext('2d');

  return { c, canvas };
}