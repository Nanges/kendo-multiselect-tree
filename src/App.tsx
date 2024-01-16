import { getMultiSelectTreeValue, MultiSelectTree, MultiSelectTreeChangeEvent } from '@progress/kendo-react-dropdowns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { conditionalTag } from './rendering';
import { fetchData, ItemWrapper } from './tree-data';
import { expandedState, processMultiSelectTreeData } from './tree-data-ops';

const dataItemKey = 'id';
const checkField = 'checkField';
const checkIndeterminateField = 'checkIndeterminateField';
const subItemsField = 'items';
const expandField = 'expanded';
const textField = 'text';
const fields = {
    dataItemKey,
    checkField,
    checkIndeterminateField,
    expandField,
    subItemsField,
};

function App() {
    // hooks
    const [value, setValue] = useState<ItemWrapper[]>([]);
    const [data, setData] = useState<ItemWrapper[]>([]);
    const [expanded, setExpanded] = useState<any[]>([]);
    const onExpandChange = useCallback((event: any) => setExpanded(expandedState(event.item, dataItemKey, expanded)), [expanded]);
    const treeData = useMemo(
        () =>
            processMultiSelectTreeData(data, {
                expanded,
                value,
                ...fields,
            }),
        [expanded, value, data]
    );

    // Initializer
    useEffect(() => {
        fetchData().then((d) => {
            setData(d.map((d) => new ItemWrapper(d)));
            setExpanded([d[0][dataItemKey]]);
        });
    }, []);

    // Handlers
    const onChange = (event: MultiSelectTreeChangeEvent) => {
        setValue(
            getMultiSelectTreeValue(data, {
                ...fields,
                ...event,
                value,
            } as any)
        );
    };

    // Create dynamic component using kind of HoC
    const Tag = conditionalTag(value);

    return (
        <>
            <fieldset>
                <MultiSelectTree
                    style={{
                        width: '300px',
                    }}
                    data={treeData}
                    value={value}
                    onChange={onChange}
                    placeholder="Please select ..."
                    textField={textField}
                    dataItemKey={dataItemKey}
                    checkField={checkField}
                    checkIndeterminateField={checkIndeterminateField}
                    subItemsField={subItemsField}
                    expandField={expandField}
                    onExpandChange={onExpandChange}
                    label={'Category'}
                    tag={Tag}
                />
            </fieldset>
        </>
    );
}

export default App;
