import styled, { css } from 'styled-components';
import {
	background,
	border,
	color,
	flexbox,
	grid,
	layout,
	position,
	shadow,
	space,
	system,
	typography,
} from 'styled-system';

const whiteSpace = system({
	whiteSpace: {
		property: 'whiteSpace',
	},
	wordBreak: {
		property: 'wordBreak',
	},
	fontFamily: {
		property: 'fontFamily',
		scale: 'fontFamily',
	},
});

export const Box = styled.div`
	position: relative;
	${space}
	${color}
	${layout}
	${background}
	${position}
	${grid}
	${border}
	${flexbox}
	${shadow}
	${typography}
	${whiteSpace}
	${({ cursor }) =>
		cursor &&
		css`
			cursor: ${cursor};
		`}
	${({ truncate }) =>
		truncate &&
		css`
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		`}
	${({ textTransform }) =>
		textTransform &&
		css`
			text-transform: ${textTransform};
		`}
	${({ textDecoration }) =>
		textDecoration &&
		css`
			text-decoration: ${textDecoration};
		`}
	${({ firstLetterCapital }) =>
		firstLetterCapital &&
		css`
			&::first-letter {
				text-transform: uppercase;
			}
		`}
	${({ primary }) =>
		primary &&
		css`
			color: ${(props) => props.theme.colors.primary};
		`}
`;
