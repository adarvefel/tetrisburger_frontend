import AsyncSelect from "react-select/async";

type OptionType = {
    value: number;
    label: string;
};

interface AsyncSearchSelectProps {
    placeholder?: string;
    loadOptions: (inputValue: string) => Promise<OptionType[]>;
    onChange: (option: OptionType | null) => void;
}

const customSelectStyles = {
    control: (base: any) => ({
        ...base,
        borderRadius: "0.3rem",
        border: "2px solid #E7DCDC",
        padding: "0.2rem",
        minHeight: "2.4rem",
        boxShadow: "none",
        fontFamily: "Montserrat",
        fontSize: "0.7rem",
        "&:hover": {
            border: "2px solid #d6cfcf",
            cursor: "pointer"
        }
    }),

    placeholder: (base: any) => ({
        ...base,
        color: "#999",
        fontFamily: "Montserrat",
        fontSize: "0.7rem"
    }),

    singleValue: (base: any) => ({
        ...base,
        color: "#222",
        fontFamily: "Montserrat",
        fontSize: "0.7rem",
        fontWeight: 500
    }),

    menu: (base: any) => ({
        ...base,
        borderRadius: "0.6rem",
        overflow: "hidden",
        border: "1px solid #eee",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        fontFamily: "Montserrat",
        fontSize: "0.7rem"
    }),

    option: (base: any, state: any) => ({
        ...base,
        backgroundColor: state.isFocused ? "#f5f5f5" : "white",
        color: "#222",
        cursor: "pointer",
        padding: "10px",
        fontFamily: "Montserrat",
        fontSize: "0.7rem"
    }),

    indicatorSeparator: () => ({
        display: "none"
    }),

    dropdownIndicator: (base: any) => ({
        ...base,
        color: "#999",
        "&:hover": {
            color: "#333"
        }
    })
};

export default function AsyncSearchSelect({
    placeholder,
    loadOptions,
    onChange
}: AsyncSearchSelectProps) {
    return (
        <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={loadOptions}
            placeholder={placeholder}
            onChange={(option) => onChange(option as OptionType)}
            styles={customSelectStyles}
        />
    );
}