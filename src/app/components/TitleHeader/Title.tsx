export const Title = (props: { title: string, classname?: string }) => {
    const { title, classname = "" } = props;
    return (
        <>
            <div className={"title text-[24px] font-[700] mb-[20px] capitalize text-white " + classname}>
                {title}
            </div>
        </>
    )
}