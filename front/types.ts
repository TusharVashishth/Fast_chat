type GroupType = {
  id: string;
  name: string;
  user_id: string;
  description: string;
  created_at: string;
  updated_at: string;
};

type GroupErrorType = {
  errors: {
    name?: string;
    description?: string;
  };
};

type MessageType = {
  message: string;
  name: string;
  group_id: string;
  created_at: string;
  type: number;
};
