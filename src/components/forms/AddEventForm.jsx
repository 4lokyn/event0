'use client'

import {
    Button,
    Calendar,
    DateField,
    DatePicker,
    FieldError,
    Form,
    Input,
    Label,
    ListBox,
    Select,
    Separator,
    TextArea,
    TextField,
} from "@heroui/react";
import {Controller, useForm} from "react-hook-form";
import {getLocalTimeZone, parseDate, today} from "@internationalized/date";
import {zodResolver} from "@hookform/resolvers/zod";
import {eventSchema} from "@/lib/validations/event";
import {useTransition} from "react";
import {addFormEvent} from "@/actions/AddFormEvent";
import {applyServerErrors} from "@/utils/form";
import {showToast} from "@/utils/toast";
import {redirect} from "next/navigation";

const formDefaultValues = {
    name: '',
    venue: '',
    description: '',
    date: today(getLocalTimeZone()).toString(),
    slug: ''
}


export default function AddEventForm({ venues }) {
    const venueList = Array.isArray(venues) ? venues : [];
    const [isPending, setTransition] = useTransition();

    const {control, handleSubmit, reset, setError, formState: { errors }} = useForm({
        resolver: zodResolver(eventSchema),
        defaultValues: formDefaultValues,
    });

    const onEventFormSubmit = async (formData) => {
        setTransition(async () => {
            const res = await addFormEvent(formData);

            if(!res.success) {
                if(res.fieldErrors) {
                    applyServerErrors(res.fieldErrors, setError, Object.keys(eventSchema.shape));
                    return;
                } else {
                    showToast({
                        title: 'Server Error',
                        description: res.message,
                        variant: 'danger'
                    })
                    reset();
                    return;
                }
            }
            if(res.success) {
                showToast({
                    title: res.message,
                    description: '',
                    variant: 'success'
                })
                redirect('/')
                reset();
            }

        })
    }

    return (
        <section className="mx-auto w-full max-w-md rounded-lg border border-border bg-surface p-6 shadow-sm">
            <h1 className="mb-5 text-2xl font-semibold text-foreground">Add event</h1>

            <Form onSubmit={handleSubmit(onEventFormSubmit)} className="flex flex-col gap-4">
                <Controller name='name' control={control} render={({ field, fieldState }) => (
                    <TextField {...field} isInvalid={fieldState.invalid} fullWidth>
                        <Label>Artist name</Label>
                        <Input placeholder="Coldplay" />
                        <FieldError>{fieldState.error?.message}</FieldError>
                    </TextField>
                )} />

                <Controller name='venue' control={control} render={({ field, fieldState }) => (
                    <Select
                        name={field.name}
                        value={field.value || null}
                        onChange={(key) => field.onChange(key ?? '')}
                        onBlur={field.onBlur}
                        isInvalid={fieldState.invalid}
                        placeholder="Select a venue"
                        fullWidth
                    >
                        <Label>Venue</Label>
                        <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <FieldError>{fieldState.error?.message}</FieldError>
                        <Select.Popover>
                            <ListBox items={venueList}>
                                {(venue) => (
                                    <ListBox.Item id={venue.id} textValue={venue.name}>
                                        {venue.name}
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                )}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                )} />

                <Separator />

                <Controller name='description' control={control} render={({ field, fieldState }) => (
                    <TextField {...field} isInvalid={fieldState.invalid} fullWidth>
                        <Label>Description</Label>
                        <TextArea placeholder="Enter a description" rows={4} />
                        <FieldError>{fieldState.error?.message}</FieldError>
                    </TextField>
                )} />

                <Controller name='date' control={control} render={({ field, fieldState }) => (
                    <DatePicker
                        name={field.name}
                        value={field.value ? parseDate(field.value) : null}
                        onChange={(value) => field.onChange(value ? value.toString() : '')}
                        onBlur={field.onBlur}
                        isInvalid={fieldState.invalid}
                        className="w-full"
                    >
                        <Label>Date</Label>
                        <DateField.Group fullWidth>
                            <DateField.Input>
                                {(segment) => <DateField.Segment segment={segment} />}
                            </DateField.Input>
                            <DateField.Suffix>
                                <DatePicker.Trigger>
                                    <DatePicker.TriggerIndicator />
                                </DatePicker.Trigger>
                            </DateField.Suffix>
                        </DateField.Group>
                        <FieldError>{fieldState.error?.message}</FieldError>
                        <DatePicker.Popover>
                            <Calendar aria-label="Event date">
                                <Calendar.Header>
                                    <Calendar.YearPickerTrigger>
                                        <Calendar.YearPickerTriggerHeading />
                                        <Calendar.YearPickerTriggerIndicator />
                                    </Calendar.YearPickerTrigger>
                                    <Calendar.NavButton slot="previous" />
                                    <Calendar.NavButton slot="next" />
                                </Calendar.Header>
                                <Calendar.Grid>
                                    <Calendar.GridHeader>
                                        {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                                    </Calendar.GridHeader>
                                    <Calendar.GridBody>
                                        {(date) => <Calendar.Cell date={date} />}
                                    </Calendar.GridBody>
                                </Calendar.Grid>
                                <Calendar.YearPickerGrid>
                                    <Calendar.YearPickerGridBody>
                                        {({ year }) => <Calendar.YearPickerCell year={year} />}
                                    </Calendar.YearPickerGridBody>
                                </Calendar.YearPickerGrid>
                            </Calendar>
                        </DatePicker.Popover>
                    </DatePicker>
                )} />

                <Separator />

                <Controller name='slug' control={control} render={({ field, fieldState }) => (
                    <TextField {...field} isInvalid={fieldState.invalid} fullWidth>
                        <Label>Slug</Label>
                        <Input placeholder="coldplay-belgrade-2026" />
                        <FieldError>{fieldState.error?.message}</FieldError>
                    </TextField>
                )} />

                <Button type="submit" fullWidth className="mt-1">
                    Add event
                </Button>
            </Form>
        </section>
    )
}
