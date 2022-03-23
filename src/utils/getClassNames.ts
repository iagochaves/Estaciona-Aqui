export default function getClassNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}
