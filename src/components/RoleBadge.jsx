export default function RoleBadge({ role }) {
  const className = `badge ${role.toLowerCase()}`;
  return <span className={className}>{role}</span>;
}
