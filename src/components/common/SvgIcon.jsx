import 'react'

const SvgIcon = ({ name, size = 24, className = '' }) => {
    return (
        <svg
            width={size}
            height={size}
            className={className}
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
        >
            <use href={`#${name}`} />
        </svg>
    )
}

export default SvgIcon