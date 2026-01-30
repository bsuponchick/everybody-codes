interface IsvalidMentorProps {
    mentor: string;
    student: string;
}

export const isValidMentor = (props: IsvalidMentorProps): boolean => {
    // A mentor is valid if the mentor string is the capital letter of the student string
    return props.mentor === props.student.toUpperCase();
}