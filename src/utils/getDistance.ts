export default function getDistance(distance: number): string {
  const maxDistanceInMeters = 999;
  if (distance > maxDistanceInMeters) {
    return `${(distance / 1000).toFixed(1)}km`;
  }
  return `${Math.floor(distance)} m`;
}
