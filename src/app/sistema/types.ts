export type ModuleItem = {
  module_key: string;
  name: string;
  caption: string | null;
  description: string | null;
  icon: string | null;
  color: string | null;
  sort_order: number | null;
  status?: string;
};

export type FeatureItem = {
  module_key: string;
  feature_key: string;
  name: string;
  description: string | null;
  icon: string | null;
  sort_order: number | null;
};

export type Row = Record<string, unknown>;

export type SystemPayload = {
  user: { id: string; email: string; name: string };
  organization: { id: string | null; name: string; role: string };
  isPlatformAdmin: boolean;
  modules: ModuleItem[];
  features: FeatureItem[];
  data: {
    conversations: Row[];
    appointments: Row[];
    workOrders: Row[];
    maintenanceRequests: Row[];
    vehicles: Row[];
    customers: Row[];
    opportunities: Row[];
    financialEntries: Row[];
    inventoryItems: Row[];
    purchaseOrders: Row[];
    alerts: Row[];
  };
};
