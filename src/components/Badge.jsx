import proptype from 'prop-types';

Badge.propTypes = {
    tag: proptype.object.isRequired,
}

export default function Badge({ tag }) {
    return (
        <div className="badge badge-info font-bold p-3 text-black m-2">{tag.name}</div>
    )
}