export const CREDENTIALS = { username: "admin", password: "admin123" };

export const LEVELS = [
  { level: 1, title: "System & Network Infrastructure", crumb: "L1: System", description: "Level 1: Global data center regions, core telemetry, contact metadata, and automated failover routing.", fields: [
    { key: "dc_name", label: "Data Center Name", type: "text", value: "DC-EAST-PRIMARY-VA", help: "Unique DC identification tag" },
    { key: "aws_region", label: "Primary AWS/Azure Region", type: "select", value: "us-east-1 (N. Virginia)", help: "Cloud gateway transit region", options: ["us-east-1 (N. Virginia)", "us-west-2 (Oregon)", "eu-west-1 (Ireland)", "ap-southeast-1 (Singapore)"] },
    { key: "contact_email", label: "Contact Email", type: "text", value: "noc-admin@enterprise.com", help: "Primary NOC escalation address" },
    { key: "auto_failover", label: "Auto-Failover Route", type: "toggle", value: true, help: "Automatic BGP reroute on primary outage" },
  ] },
  { level: 2, title: "Core Data Center Fabrics", crumb: "L2: Fabrics", description: "Level 2: Leaf-Spine network topology, EVPN fabric overlays, and spine interconnects.", fields: [
    { key: "fabric_id", label: "Fabric ID / Tag", type: "text", value: "FABRIC-200-EAST", help: "BGP EVPN fabric identifier" },
    { key: "spacing_mode", label: "Fabric Spacing Mode", type: "select", value: "High-Density Interconnect", help: "Spine-leaf interconnect density", options: ["High-Density Interconnect", "Standard Mesh", "Spine Ultra-Low Latency", "Redundant Dual-Ring"] },
    { key: "max_spines", label: "Max Spine Switches", type: "number", value: 8, help: "Maximum active spine switch capacity" },
    { key: "dynamic_lb", label: "Dynamic Load Balancing", type: "toggle", value: true, help: "Flowlet packet load balancing" },
  ] },
  { level: 3, title: "Core Switch Cluster", crumb: "L3: Cluster", description: "Level 3: Clustered core switches, first-hop redundancy and inter-node synchronisation.", fields: [
    { key: "cluster_domain", label: "Cluster Domain Name", type: "text", value: "vx9000-core-cluster-01.internal", help: "FQDN for switch cluster management" },
    { key: "vrrp_priority", label: "VRRP Priority", type: "number", value: 250, help: "First Hop Redundancy priority (1-255)" },
    { key: "sync_interval", label: "Sync Interval (ms)", type: "number", value: 100, help: "Inter-node state synchronization interval" },
    { key: "keepalive_proto", label: "Keepalive Protocol", type: "select", value: "BFD (Bidirectional Forwarding)", help: "Cluster liveness detection", options: ["BFD (Bidirectional Forwarding)", "ICMP Ping Sync", "Hardware Multicast"] },
  ] },
  { level: 4, title: "High-Speed Linecards", crumb: "L4: Linecards", description: "Level 4: Linecard modules, clock synchronisation and thermal protection.", fields: [
    { key: "module_label", label: "Module Label", type: "text", value: "SLOT3-CX-100G-CARD", help: "Hardware slot module label" },
    { key: "clock_mode", label: "Clock Sync Mode", type: "select", value: "Precision Time Protocol (IEEE 1588)", help: "Linecard clock source", options: ["Precision Time Protocol (IEEE 1588)", "Internal Crystal Oscillator", "NTP Network Clock", "Synchronous Ethernet"] },
    { key: "port_capacity", label: "Port Capacity", type: "number", value: 32, help: "Total active physical ports on linecard" },
    { key: "thermal_throttle", label: "Thermal Throttle Guard", type: "toggle", value: true, help: "Auto-power reduction at 85°C" },
  ] },
  { level: 5, title: "100G Transceiver Port Group", crumb: "L5: Ports", description: "Level 5: Transceiver port groups, administrative state and forward error correction.", fields: [
    { key: "port_alias", label: "Port Alias / Tag", type: "text", value: "UPLINK-TO-DIST-01", help: "Descriptive interface alias" },
    { key: "admin_status", label: "Port Admin Status", type: "select", value: "Enabled (UP)", help: "Interface administrative state", options: ["Enabled (UP)", "Disabled (DOWN)", "Loopback Testing"] },
    { key: "fec_mode", label: "FEC Mode", type: "select", value: "RS-FEC (Clause 91)", help: "Forward error correction scheme", options: ["RS-FEC (Clause 91)", "FC-FEC (Clause 74)", "Disabled (No FEC)"] },
    { key: "max_frame_mtu", label: "Max Frame Size / MTU", type: "number", value: 9216, help: "Layer 2 Ethernet max frame length" },
  ] },
  { level: 6, title: "Virtual Subnet Router", crumb: "L6: Router", description: "Level 6: Layer 3 virtual routing instance, MTU and routing protocol identifiers.", fields: [
    { key: "vrf_name", label: "Virtual Router Name", type: "text", value: "VLAN4094-GW-EAST", help: "Layer 3 VRF interface instance" },
    { key: "mtu_bytes", label: "MTU Size (Bytes)", type: "number", value: 9000, help: "Layer 3 IP Packet MTU limit" },
    { key: "ospf_area", label: "OSPF Area ID", type: "text", value: "0.0.0.0 (Backbone)", help: "OSPF routing protocol area" },
    { key: "bgp_as", label: "BGP Autonomous System", type: "number", value: 65501, help: "Private BGP Autonomous System Number" },
  ] },
  { level: 7, title: "Static Subnet Mask & IPv4 Configuration", crumb: "L7: Subnet", description: "Level 7: Static IP CIDR masks, default gateway addresses, and address pool allocation.", fields: [
    { key: "subnet_desc", label: "Subnet Description", type: "text", value: "Primary Enterprise Gateway - West Subnet", help: "Subnet usage metadata" },
    { key: "ipv4_gw", label: "Static IPv4 Gateway", type: "text", value: "10.254.100.1", help: "Default IPv4 gateway address" },
    { key: "cidr_mask", label: "CIDR Mask / Subnet Bits", type: "select", value: "/24 (255.255.255.0) - Standard Class C", help: "Subnet CIDR notation and network mask", options: ["/24 (255.255.255.0) - Standard Class C", "/27 (255.255.255.224) - Small Subnet", "/16 (255.255.0.0) - Large Campus Block", "/30 (255.255.255.252) - Point-to-Point Link"] },
    { key: "allocation_type", label: "Subnet Allocation Type", type: "select", value: "Infrastructure Static", help: "Host IP allocation strategy", options: ["Infrastructure Static", "DHCP Dynamic Pool", "VIP HSRP Reserved"] },
  ] },
];

export const STORAGE_KEY = "nexus-console-config";

export function getDefaultValues() {
  return Object.fromEntries(LEVELS.flatMap(level => level.fields.map(field => [field.key, field.value])));
}

export function loadValues() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? { ...getDefaultValues(), ...saved } : getDefaultValues();
  } catch {
    return getDefaultValues();
  }
}
