export default function getDistance(distance: number): string {
  const maxDistanceInMeters = 999;
  if (distance > maxDistanceInMeters) {
    return `${Math.floor(distance / 1000)}km`;
  }
  return `${Math.floor(distance)}m`;
}
