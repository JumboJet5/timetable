import { FormControl, FormGroup, Validators } from '@angular/forms';

export const lessonForm = () => new FormGroup({
    theme: new FormControl('', Validators.required),
    housing: new FormControl('', Validators.required),
    room: new FormControl('', Validators.required),
    format: new FormControl('', Validators.required),
    subgroup: new FormControl(''),
    teachers: new FormControl('', Validators.required),
    vacantWeeks: new FormControl('', Validators.required),
    day: new FormControl('', Validators.required),
    lesson_time: new FormControl('', Validators.required),
});
