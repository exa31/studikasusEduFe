import proptypes from 'prop-types';

Select.propTypes = {
    name: proptypes.string,
    label: proptypes.string,
    options: proptypes.array,
    error: proptypes.string,
    handleSelect: proptypes.func,
    handleName: proptypes.func
}

export default function Select({ name, handleName, handleSelect, label, options, error }) {

    function handleChange(name, id) {
        const value = options.find(option => option.id === id).name;
        handleSelect(name, id);

        handleName(name, value);
    }

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <select onChange={(e) => handleChange(name, e.target.value)} defaultValue={`Pilih ${label}`} name={name} className="input input-bordered" >
                <option disabled>Pilih {label}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.id}>{option.name}</option>
                ))}
            </select>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}