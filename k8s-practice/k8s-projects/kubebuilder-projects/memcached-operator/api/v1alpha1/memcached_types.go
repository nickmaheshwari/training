/*
Copyright 2025.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package v1alpha1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// EDIT THIS FILE!  THIS IS SCAFFOLDING FOR YOU TO OWN!
// NOTE: json tags are required.  Any new fields you add must have json tags for the fields to be serialized.

// MemcachedSpec defines the desired state of Memcached.
type MemcachedSpec struct {
	// INSERT ADDITIONAL SPEC FIELDS - desired state of cluster
	// Important: Run "make" to regenerate code after modifying this file

	// size defines the number of Memcached instances
    // The following markers will use OpenAPI v3 schema to validate the value
    // More info: https://book.kubebuilder.io/reference/markers/crd-validation.html
	// +kubebuilder:validation:Minimum=1
    // +kubebuilder:validation:Maximum=3
    // +kubebuilder:validation:ExclusiveMaximum=false
    // +optional
	Size int32 `json:"size,omitempty"`
}

// MemcachedStatus defines the observed state of Memcached.
type MemcachedStatus struct {
	// INSERT ADDITIONAL STATUS FIELD - define observed state of cluster
	// Important: Run "make" to regenerate code after modifying this file

	// conditions represent the current state of the Memcached resource.
    // Each condition has a unique type and reflects the status of a specific aspect of the resource.
    //
    // Standard condition types include:
    // - "Available": the resource is fully functional.
    // - "Progressing": the resource is being created or updated.
    // - "Degraded": the resource failed to reach or maintain its desired state.
    //
    // The status of each condition is one of True, False, or Unknown.
    // +listType=map
    // +listMapKey=type
	Conditions []metav1.Condition `json:"conditions,omitempty" patchStrategy:"merge" patchMergeKey:"type" protobuf:"bytes,1,rep,name=conditions"`

}

// +kubebuilder:object:root=true
// +kubebuilder:subresource:status

// Memcached is the Schema for the memcacheds API.
type Memcached struct {
	metav1.TypeMeta   `json:",inline"`

	// metadata is a standard object metadata
    // +optional
	metav1.ObjectMeta `json:"metadata,omitempty"`

	// spec defines the desired state of Memcached
    // +required
	Spec   MemcachedSpec   `json:"spec,omitempty"`

	// status defines the observed state of Memcached
    // +optional
	Status MemcachedStatus `json:"status,omitempty"`
}

// +kubebuilder:object:root=true

// MemcachedList contains a list of Memcached.
type MemcachedList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []Memcached `json:"items"`
}

func init() {
	SchemeBuilder.Register(&Memcached{}, &MemcachedList{})
}
