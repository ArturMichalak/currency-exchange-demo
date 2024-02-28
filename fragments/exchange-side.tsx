import { MenuItem, TextField } from '@mui/material';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { PropsWithChildren, type ChangeEventHandler } from 'react';

interface ExchangeSideProps {
  onSelectChange: (event: SelectChangeEvent) => void;
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  codes: string[];
  defaults: { input: number; select: string };
}

export default function ExchangeSide({
  onSelectChange,
  onInputChange,
  codes,
  children,
  defaults,
}: PropsWithChildren<ExchangeSideProps>) {
  return (
    <div>
      {children}
      <div>
        <Select defaultValue={defaults.select} onChange={onSelectChange}>
          {codes.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </Select>

        <TextField
          defaultValue={defaults.input}
          type="number"
          onChange={onInputChange}
        />
      </div>
    </div>
  );
}
