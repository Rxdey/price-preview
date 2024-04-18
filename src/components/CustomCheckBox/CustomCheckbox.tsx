import React from "react";
import { useCheckbox, Chip, VisuallyHidden, tv } from "@nextui-org/react";
import { CheckIcon } from './CheckIcon.jsx'

const checkbox = tv({
    slots: {
        base: "border-default border-2 hover:bg-default-200",
        content: "text-default-500"
    },
    variants: {
        isSelected: {
            true: {
                base: "border-secondary-400 bg-secondary hover:bg-secondary-500 hover:border-secondary-400",
                content: "text-primary-foreground"
            }
        },
        isFocusVisible: {
            true: {
                base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
            }
        }
    }
})

export default function CustomCheckbox(props: any) {
    const { children, isSelected, isFocusVisible, getBaseProps, getLabelProps, getInputProps, } = useCheckbox({
        ...props
    })

    const styles = checkbox({ isSelected, isFocusVisible })

    return (
        <label {...getBaseProps()}>
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <Chip
                classNames={{
                    base: styles.base(),
                    content: styles.content(),
                }}
                variant="faded"
            // {...getLabelProps() as any}
            >
                {children ? children : isSelected ? "Enabled" : "Disabled"}
            </Chip>
        </label>
    );
}
