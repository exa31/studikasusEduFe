import proptypes from 'prop-types';

Checkbox.propTypes = {
    label: proptypes.string,
    name: proptypes.string,
    value: proptypes.string,
    disabled: proptypes.bool,
    handleCheckbox: proptypes.func
}

export default function Checkbox({ label, value, disabled, handleCheckbox }) {
    return (
        <div className="form-control">
            <label className="label  cursor-pointer">
                <span className="label-text text-black">{label}</span>
                <input type="checkbox" onClick={(e) => handleCheckbox(e.target.value)} disabled={disabled} value={value} name='tags' id={label} className="checkbox checkbox-primary" />
            </label>
        </div>
    )
}