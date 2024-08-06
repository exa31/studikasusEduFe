import proptype from 'prop-types';

SelectCategory.propTypes = {
    category: proptype.array,
    handleChange: proptype.func,
    valueCategory: proptype.string
}

export default function SelectCategory({ category, valueCategory, handleChange }) {
    return (
        <div className="form-control">
            <select onChange={(e) => handleChange(e.target.value)} value={valueCategory} name='category' className="input m-6 input-bordered" >
                <option value={'Pilih Category'} disabled>Pilih Category</option>
                {category.map((option, index) => (
                    <option key={index} value={option.name}>{option.name}</option>
                ))}
            </select>

        </div>
    )
}