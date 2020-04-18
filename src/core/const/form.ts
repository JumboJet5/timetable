import { FormControl, FormGroup, Validators } from '@angular/forms';

export const lessonForm = () => new FormGroup({
    theme: new FormControl(null, Validators.required),
    housing: new FormControl(null, Validators.required),
    room: new FormControl(null, Validators.required),
    format: new FormControl(null, Validators.required),
    subgroup: new FormControl(null),
    teachers: new FormControl([], Validators.required),
    weeks: new FormControl('', Validators.pattern(/1/)),
    day: new FormControl(null, Validators.required),
    lesson_time: new FormControl(null, Validators.required),
    group_semester: new FormControl(null, Validators.required),
    conduct_type: new FormControl(null, Validators.required),
    link: new FormControl(null),
});

