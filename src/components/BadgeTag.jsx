import proptype from 'prop-types';

BadgeTag.propTypes = {
    tag: proptype.object.isRequired,
    handleClick: proptype.func.isRequired,
    criteria: proptype.array.isRequired
}

export default function BadgeTag({ tag, criteria, handleClick }) {

    function click() {
        handleClick(tag.name)
    }

    const includesTag = criteria.includes(tag.name);

    return (
        <button onClick={click} className={includesTag ? "btn btn-info font-bold text-sm p-3 text-white m-2" : "btn btn-outline btn-info"}>{tag.name}</button>
    )
}