import { supabase } from '~/utils/supabase';

export const fetchTricycleDetails = async (tricycle_id: string) => {
  const { data, error } = await supabase
    .from('tricycles')
    .select('*')
    .eq('id', tricycle_id)
    .maybeSingle();

  return { data, error };
};
