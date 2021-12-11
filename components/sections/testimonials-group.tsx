import { SectionsData } from "types/sections-data";

type TestimonialsGroupProps = {
    data: SectionsData,
}
 
const TestimonialsGroup:React.FC<TestimonialsGroupProps> = (props) => {
    const { data } = props;
    return (
        <div>
            TestimonialsGroup
        </div>
    );
}
 
 
export default TestimonialsGroup;