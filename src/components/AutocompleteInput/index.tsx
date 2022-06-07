import Autocomplete from 'react-autocomplete';
import { InputHTMLAttributes, useState } from 'react';
import { useField } from 'formik';
import classNames from 'classnames';
import { FeatureProps, getLatLongByAddress } from '../../services/apiMapBox';

interface InputTypes extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  fieldValue: string;
  setFieldValue: (value: string, latLng: number[]) => void;
}

const AutocompleteInput: React.FC<InputTypes> = ({
  label,
  required,
  fieldValue,
  setFieldValue,
  ...props
}) => {
  const [field, meta] = useField(props as any);
  const [addresses, setAddresses] = useState<FeatureProps[]>([]);
  return (
    <>
      <label
        htmlFor={props.name}
        className={classNames('block text-sm font-medium text-gray-700', {
          "after:content-['*'] after:ml-0.5 after:text-red-500": required,
        })}
      >
        {label}
      </label>
      <Autocomplete
        renderInput={(genericProps) => {
          return (
            <input
              type="text"
              id="address"
              className={classNames(
                'mt-1 disabled:bg-slate-50 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
                {
                  'border-red-500': meta.touched && meta.error,
                  'border-green-500': meta.touched && !meta.error,
                },
              )}
              {...field}
              {...genericProps}
            />
          );
        }}
        getItemValue={(item) => item.place_name}
        items={addresses}
        renderItem={(item, isHighlighted) => {
          const addressDetails = item.place_name.replace(`${item.text}, `, '');
          return (
            <div
              key={item.id}
              className={classNames('py-2 px-3 bg-white', {
                'bg-[#f3f3f3]': isHighlighted,
              })}
            >
              <p className="font-bold text-base">{item.text}</p>
              <p className="text-sm text-ellipsis">{addressDetails}</p>
            </div>
          );
        }}
        value={fieldValue}
        onChange={async (e) => {
          setFieldValue(e.target.value, []);
          const newAddresses = await getLatLongByAddress(e.target.value);
          setAddresses(newAddresses.features);
        }}
        onSelect={(value, item) => {
          setFieldValue(value, item.geometry.coordinates);
        }}
        wrapperProps={{
          className: 'w-full',
        }}
      />
      {(typeof meta.error === 'string' ||
        (meta.error as any) instanceof String) &&
        meta.touched && (
          <p className="ml-2 mt-1 text-sm text-red-500">{meta.error}</p>
        )}
    </>
  );
};

export default AutocompleteInput;
