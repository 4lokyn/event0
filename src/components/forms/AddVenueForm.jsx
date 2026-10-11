'use client'

import { Button, FieldError, Form, Input, Label, ListBox, Select, TextField } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {useTransition} from "react";
import {addFormVenue} from "@/actions/addFormVenue";
import {venueSchema} from "@/lib/validations/venu";
import {applyServerErrors} from "@/utils/form";
import {showToast} from "@/utils/toast";


export default function AddVenueComponent({ states }) {
    const stateList = Array.isArray(states) ? states : [];
    const [isPending, setTransition] = useTransition();

    const { control, handleSubmit, reset, setError, formState: { isSubmitting } } = useForm({
        resolver: zodResolver(venueSchema),
        defaultValues: {
            name: '',
            address: '',
            state: '',
        }
    });

    const handleAddVenue = async (payload) => {

        setTransition(async () => {
            const res = await addFormVenue(payload);

            if (res.message) {
                showToast({
                    title: res.message,
                    description: '',
                    variant: 'success'
                })
            }

            if (res.fieldErrors) {
                applyServerErrors(res.fieldErrors, setError, Object.keys(venueSchema.shape));
                return;
            }
            if (res.error) {
                showToast({
                    title: 'Server Error',
                    description: res.error,
                    variant: 'danger'
                })
                return;
            }


            reset();

        })
    }

    return (
        <section className="mx-auto w-full max-w-md rounded-lg border border-border bg-surface p-6 shadow-sm">
            <h1 className="mb-5 text-2xl font-semibold text-foreground">Add venue</h1>

            <Form onSubmit={handleSubmit(handleAddVenue)} className="flex flex-col gap-4">
                <Controller name='name' control={control} render={({ field, fieldState }) => (
                    <TextField {...field} isInvalid={fieldState.invalid} fullWidth>
                        <Label>Venue name</Label>
                        <Input placeholder="Madison Square Garden" />
                        <FieldError>{fieldState.error?.message}</FieldError>
                    </TextField>
                )} />

                <Controller name='address' control={control} render={({ field, fieldState }) => (
                    <TextField {...field} isInvalid={fieldState.invalid} fullWidth>
                        <Label>Address</Label>
                        <Input placeholder="4 Pennsylvania Plaza" />
                        <FieldError>{fieldState.error?.message}</FieldError>
                    </TextField>
                )} />

                <Controller name='state' control={control} render={({ field, fieldState }) => (
                    <Select
                        name={field.name}
                        value={field.value || null}
                        onChange={(key) => field.onChange(key ?? '')}
                        onBlur={field.onBlur}
                        isInvalid={fieldState.invalid}
                        placeholder="Select a state"
                        fullWidth
                    >
                        <Label>State</Label>
                        <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <FieldError>{fieldState.error?.message}</FieldError>
                        <Select.Popover>
                            <ListBox items={stateList}>
                                {(state) => (
                                    <ListBox.Item id={state.name} textValue={state.name}>
                                        {state.name}
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                )}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                )} />

                <Button isDisabled={isSubmitting} isPending={isSubmitting} type="submit" fullWidth className="mt-1">
                    Add venue
                </Button>
            </Form>
        </section>
    )
}
