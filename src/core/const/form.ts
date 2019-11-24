import { FormControl, FormGroup, Validators } from '@angular/forms';

export const lessonForm = () => new FormGroup({
    theme: new FormControl(null, Validators.required),
    housing: new FormControl(null, Validators.required),
    room: new FormControl(null, Validators.required),
    format: new FormControl(null, Validators.required),
    subgroup: new FormControl(null),
    teachers: new FormControl([], Validators.required),
    vacantWeeks: new FormControl([], Validators.required),
    day: new FormControl(null, Validators.required),
    lesson_time: new FormControl(null, Validators.required),
    group_semester: new FormControl(null, Validators.required),
});

