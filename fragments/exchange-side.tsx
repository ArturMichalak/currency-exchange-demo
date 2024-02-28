'use client';

import { MenuItem, TextField } from '@mui/material';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { PropsWithChildren, type ChangeEventHandler } from 'react';

interface ExchangeSideProps {
  onSelectChange: (event: SelectChangeEvent) => void;
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  codes: string[];
  defaultCurrency: string;
  amount: number;
}

export default function ExchangeSide({
  onSelectChange,
  onInputChange,
  codes,
  children,
  defaultCurrency,
  amount,
}: PropsWithChildren<ExchangeSideProps>) {
  return (
    <div>
      {children}
      <div>
        <Select value={defaultCurrency} onChange={onSelectChange}>
          {codes.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </Select>

        <TextField value={amount} type="number" onChange={onInputChange} />
      </div>
    </div>
  );
}
