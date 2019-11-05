const { assign } = lodash;
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
const {
  PanelBody,
  RadioControl
} = wp.components;

const {
  InspectorControls,
} = window.wp.editor;

const { createHigherOrderComponent } = wp.compose;

const isValidBlockType = ( name ) => {
  const validBlockTypes = [
    'core/paragraph',   // 段落
    'core/list',        // リスト
    'core/image'        // イメージ
  ];
  return validBlockTypes.includes( name );
};

export const addBlockControl = createHigherOrderComponent( ( BlockEdit ) => {
  let selectOption = '';

  return ( props ) => {
    // isValidBlockType で指定したブロックが選択されたら表示
    if ( isValidBlockType( props.name ) && props.isSelected ) {
      // すでにオプション選択されていたら
      if (props.attributes.marginSetting) {
        selectOption = props.attributes.marginSetting;
      }
      return (
        <Fragment>
          <BlockEdit { ...props } />
          <InspectorControls>
            <PanelBody title="マージン設定" initialOpen={ false } className="margin-controle">
              <RadioControl
                selected={ selectOption }
                options={ [
                  { label: 'なし', value: '' },
                  { label: '小', value: 'mb-sm' },
                  { label: '中', value: 'mb-md' },
                  { label: '大', value: 'mb-lg' },
                ] }
                onChange={ ( changeOption ) => {
                  let newClassName = changeOption;
                  // 高度な設定で入力している場合は追加する
                  if (props.attributes.className) {
                    // 付与されているclassを取り出す
                    let inputClassName = props.attributes.className;
                    // スペース区切りを配列に
                    inputClassName = inputClassName.split(' ');
                    // 選択されていたオプションの値を削除
                    let filterClassName = inputClassName.filter(function(name) {
                      return name !== selectOption;
                    });
                    // 新しく選択したオプションを追加
                    filterClassName.push(changeOption);
                    // 配列を文字列に
                    newClassName = filterClassName.join(' ');
                  }

                  selectOption = changeOption;
                  props.setAttributes({
                    className: newClassName,
                    marginSetting: changeOption
                  });
                } }
              />
            </PanelBody>
          </InspectorControls>
        </Fragment>
      );
    }
    return <BlockEdit { ...props } />;
  };
}, 'addMyCustomBlockControls' );
addFilter( 'editor.BlockEdit', 'myblock/block-control', addBlockControl );

export function addAttribute( settings ) {
  if ( isValidBlockType( settings.name ) ) {
    settings.attributes = assign( settings.attributes, {
      marginSetting: {
        type: 'string',
      },
    } );
  }
  return settings;
}
addFilter( 'blocks.registerBlockType', 'myblock/add-attr', addAttribute );

export function addSaveProps( extraProps, blockType, attributes ) {
  if ( isValidBlockType( blockType.name ) ) {
    // なしを選択した場合はmarginSetting削除
    if (attributes.marginSetting === '') {
      delete attributes.marginSetting;
    }
  }
  return extraProps;
}
addFilter( 'blocks.getSaveContent.extraProps', 'myblock/add-props', addSaveProps );