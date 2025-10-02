import { Ride, Tricycle } from '../types';
import { getErrorMessage } from '../utils/utils';
import { fetchDriverDetails, fetchOperatorDetails } from './db';
import { supabase } from './supabase';

export async function createNewRide(tricycleDetails: Tricycle): Promise<Ride> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error('User not authenticated');

    const { data: driverDetails } = await fetchDriverDetails(tricycleDetails.assigned_driver);
    const { data: operatorDetails } = await fetchOperatorDetails(tricycleDetails.operator_id);

    const rideData = {
      commuter_id: user.id,
      tricycle_details: tricycleDetails,
      driver_details: driverDetails,
      operator_details: operatorDetails,
      fare: '15.00',
    };

    console.log(rideData);

    const { data, error } = await supabase.from('rides').insert(rideData).select().single();

    if (error || !data) {
      throw new Error(error?.message || 'Unable to create new ride');
    }

    // const logData = {
    //   data: operatorData,
    //   operator_id: user.id,
    //   log_event: 'create_operator_account',
    // };

    // const { error: logError } = await createLog(logData);

    // if (logError) {
    //   throw new Error(logError.message || 'Unable to log create operator');
    // }

    return data;
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}

export const updateRide = async (ride_id: string) => {
  const endTime = new Date().toISOString();
  const { data, error } = await supabase
    .from('rides')
    .update({ end_time: endTime })
    .eq('id', ride_id)
    .single();

  return { data, error };
};

export const fetchRecentRide = async (): Promise<Ride> => {
  const { data, error } = await supabase
    .from('rides')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error?.message || 'No recent ride');

  return data;
};

export const fetchRideHistory = async (): Promise<Ride[]> => {
  const { data, error } = await supabase
    .from('rides')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(0, 5);

  if (error) throw new Error(error?.message || 'No recent ride history');

  return data;
};
