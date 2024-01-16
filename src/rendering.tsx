import { ItemWrapper } from './tree-data';

const tagClassName = 'k-button k-button-md k-rounded-md k-button-solid k-button-solid-base';
const focusedTagClassName = tagClassName + ' k-focus';
const preventDefault = (event) => event.preventDefault();
const stopPropagation = (event) => event.stopPropagation();

export const Tag = (props) => {
    const { tagData, guid, focusedTag, onTagDelete } = props;
    return (
        <li
            className={tagData === focusedTag ? focusedTagClassName : tagClassName}
            id={`tag-${guid}-${tagData.text.replace(/\s+/g, '-')}`}
            onMouseDown={preventDefault}
            onClick={stopPropagation}
            aria-selected={true}
            role="option"
        >
            <span
                style={{
                    display: 'inline-block',
                    background: '#333',
                    color: '#fff',
                    borderRadius: '50%',
                    width: 18,
                    height: 18,
                    textAlign: 'center',
                    marginRight: 3,
                }}
            >
                {tagData.data[0].id}
            </span>
            <span>{tagData.text}1</span>
            <span aria-label="delete" className="k-select" onClick={(e) => onTagDelete.call(undefined, tagData.data, e)}>
                <span className="k-icon k-i-close" />
            </span>
        </li>
    );
};

export const conditionalTag = (selectedItems: ItemWrapper[]) => {
    return (props) => {
        const { tagData } = props;
        const [item] = tagData.data as ItemWrapper[];
        const shouldRender = !item.parent || !selectedItems.includes(item.parent);

        return shouldRender ? <Tag {...props} /> : null;
    };
};
