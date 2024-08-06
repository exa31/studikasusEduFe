import proptyoe from 'prop-types';

TextArea.propTypes = {
    label: proptyoe.string,
    name: proptyoe.string,
    value: proptyoe.string
}

export default function TextArea({ label, name, value }) {
    return (
        <label className="form-control">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <textarea className="textarea textarea-bordered h-24" name={name} defaultValue={value} placeholder={`${label} Alamat`}></textarea>
        </label>
    )
}