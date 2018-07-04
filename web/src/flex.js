export const flex = ({
  flex = 1,
  vertical,
  align,
  alignVertical,
} = {}) => ({
  display: 'flex',
  flex: (typeof flex === 'number') ? `${flex} 0 auto` : flex,
  flexDirection: vertical ? 'column' : 'row',
  alignItems: vertical ? align : alignVertical,
  justifyContent: vertical ? alignVertical : align,
})
