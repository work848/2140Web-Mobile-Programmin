export function InstrumentButton({ item, selectedInstrument, onInstrumentSelect }) {
    return (
        <button 
            className={selectedInstrument === item ? "toggle-selected" : "toggle"}
            onClick={() => onInstrumentSelect(item)}>
            {item}
        </button>
    );
}

export function ToggleButton({ selected, onClick }) {
    return (
        <button 
            className={selected ? 'toggle-selected' : 'toggle'}
            onClick={onClick}>
        </button>
    );
}

