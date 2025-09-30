import { CreateAccount } from '../utils/schemas';
import { supabase } from './supabase';

export const fetchDriverDetails = async (driver_id: string) => {
  const { data, error } = await supabase.from('drivers').select('*').eq('id', driver_id).single();

  return { data, error };
};

export const fetchOperatorDetails = async (operator_id: string) => {
  const { data, error } = await supabase
    .from('operators')
    .select('*')
    .eq('id', operator_id)
    .single();

  return { data, error };
};

export const createAccount = async (accountData: CreateAccount, id: string) => {
  const { data, error } = await supabase
    .from('commuters')
    .update([accountData])
    .eq('id', id)
    .select()
    .single();

  return { data, error };
};
