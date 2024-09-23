import React from "react"

type titleProps = {
    title: string,
}

function Title(props: titleProps) {
    return(
        <p className="abtext__title">
            {props.title}
        </p>
    )
}

export default Title