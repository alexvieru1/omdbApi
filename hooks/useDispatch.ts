import { useDispatch as reduxUseDispatch } from 'react-redux';
import type { AppDispatch } from '@/app/store';

export const useDispatch = () => reduxUseDispatch<AppDispatch>();
