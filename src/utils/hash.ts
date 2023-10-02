import * as bcrypt from 'bcryptjs';

export const createHash = async (data: string): Promise<string> => {
  const hash = await bcrypt.hash(data, 10);
  return hash;
};
